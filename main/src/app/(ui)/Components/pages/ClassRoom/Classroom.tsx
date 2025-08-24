
import Class from '../../PageComponents/Classroom/Class'
import React from 'react';




interface ClassRoomProps {
  roomId: string;
  isHost: boolean

}

const Classroom: React.FC<ClassRoomProps> = ({ roomId, isHost }) => {


  return (
    <div>
      <Class roomId={roomId} isHost={isHost} />
    </div>
  )
}

export default Classroom
