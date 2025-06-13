"use client";

import Classroom from "@/app/(ui)/Components/pages/ClassRoom/Classroom";
import { useSocket } from "@/app/Context/Socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface User {
  socketId: string;
  userName: string;
  canEdit: boolean;
  host: boolean;
}

const Room = () => {
  const { roomId } = useParams();
  const router = useRouter();
  const roomIdString = Array.isArray(roomId) ? roomId[0] : roomId || "";

  const [isHost, setIsHost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { socket, createSocket, setUsers, resetSocket } = useSocket();
  const [userName, setUserName] = useState<string>("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleClass = async () => {
      try {
        if (!roomIdString) return;
        const res = await axios.post(
          "/api/host/class/start",
          { classroomId: roomIdString },
          { withCredentials: true }
        );

        if (!res.data.success) {
          toast.error(res.data.message || "Something went wrong!");
          router.back();
          return;
        }
        setUserName(res.data.userName);
        toast.success("Class started successfully!");
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        const errorMessage =
          err.response?.data?.message || err.message || "Internal Server Error";
        toast.error(errorMessage);
        router.push("/events");
      }
    };

    handleClass();
  }, [roomIdString, router]);

  useEffect(() => {
    if (userName) {
      createSocket("http://localhost:5100");
    }
  }, [userName, createSocket]);

  useEffect(() => {
    if (!socket || !roomIdString || !userName) return;

    socket.emit("join", { roomId: roomIdString, userName });
    setIsLoading(false);

    const handleJoined = ({
      clients,
      userName: newUserName,
      owner,
    }: {
      clients: User[];
      userName: string;
      owner: string;
    }) => {
      if (Array.isArray(clients)) setUsers(clients);
      if (newUserName !== userName) toast.success(`${newUserName} joined the room.`);
      setIsHost(socket.id === owner);
    };

    const handleRoomTerminated = async ({ roomId }: { roomId: string }) => {
      const res = await axios.post("/api/host/class/stop", { classroomId: roomId , msg : "IAmTheOne" });
      if (res.data.success) {
        toast.error("Room has been terminated by the owner.");
        router.push("/");
      }
    };

    const handleEditPermissionUpdated = ({
      targetId,
      canEdit,
    }: {
      targetId: string;
      canEdit: boolean;
    }) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.socketId === targetId ? { ...u, canEdit } : u
        )
      );
    };

    const handleDisconnected = ({
      clients,
      userName: leftUser,
    }: {
      clients: User[];
      userName: string;
    }) => {
      setUsers(clients);
      if (leftUser) toast.error(`${leftUser} left the room.`);
    };

    const handleKicked = () => {
      toast.error("You have been removed from the room.");
      router.push("/classroom");
    };

    const handleUpdatedUsersAfterRemoving = ({
      leftUser,
      clients,
    }: {
      leftUser: string;
      clients: User[];
    }) => {
      setUsers(clients);
      if (leftUser) toast.error(`${leftUser} has been removed from the room.`);
    };

    socket.on("joined", handleJoined);
    socket.on("roomTerminated", handleRoomTerminated);
    socket.on("editPermissionUpdated", handleEditPermissionUpdated);
    socket.on("disconnected", handleDisconnected);
    socket.on("kicked", handleKicked);
    socket.on("updatedUsersAfterRemoving", handleUpdatedUsersAfterRemoving);

    return () => {
      socket.off("joined", handleJoined);
      socket.off("roomTerminated", handleRoomTerminated);
      socket.off("editPermissionUpdated", handleEditPermissionUpdated);
      socket.off("disconnected", handleDisconnected);
      socket.off("kicked", handleKicked);
      socket.off("updatedUsersAfterRemoving", handleUpdatedUsersAfterRemoving);

      if (socket.connected) socket.disconnect();
      resetSocket();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, roomIdString, userName]);

  if (isLoading) return <p className="text-white">Loading...</p>;

  return <Classroom roomId={roomIdString} isHost={isHost} />;
};

export default Room;
