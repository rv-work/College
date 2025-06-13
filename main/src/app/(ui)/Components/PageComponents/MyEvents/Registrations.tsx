import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, ChevronDown } from "lucide-react";
import MemberCard from "./MemberCard"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card
} from "@/components/ui/card";

// Define Types
interface TeamMember {
  admissionNumber: string;
  name: string;
  year: string;
  branch: string;
  profilePicture?: string;
}

interface EventRegistration {
  id: string | number;
  teamName: string;
  name: string;
  createdAt: string;
  teamMembers: TeamMember[];
}

interface RegistrationsProps {
  eventRegistrations: EventRegistration[];
  expandedRows: Record<string, boolean>; 
  setExpandedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  joined : boolean
}


const Registrations: React.FC<RegistrationsProps> = ({ eventRegistrations, expandedRows, setExpandedRows ,joined }) => {


  const toggleRow = (id: string | number ) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h3 className="text-2xl font-bold my-6 flex items-center text-blue-900">
          <UserPlus className="mr-3 text-blue-600 w-6 h-6" />
          {joined ? "My Registration" : "Registrations"}
        </h3>
        <Card className="shadow-xl rounded-3xl overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow className="text-xl">
                <TableHead>Team Name</TableHead>
                <TableHead>Registered By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventRegistrations?.map((reg) => (
                <React.Fragment key={reg.id}>
                  <TableRow className="hover:bg-blue-50 transition-colors">
                    <TableCell>{reg.teamName}</TableCell>
                    <TableCell>{reg.name}</TableCell>
                    <TableCell>{new Date(reg.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <ChevronDown
                          className={`cursor-pointer text-blue-600 ${
                            expandedRows[reg.id] ? "rotate-180" : ""
                          }`}
                          onClick={() => toggleRow(reg.id)}
                        />
                      </motion.div>
                    </TableCell>
                  </TableRow>
                  <AnimatePresence>
                    {expandedRows[reg.id] && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <td colSpan={4}>
                          <div className="grid grid-cols-3 gap-4 p-6 bg-blue-50 rounded-b-3xl">
                            {reg.teamMembers.map((member : TeamMember) => (
                              <MemberCard key={member.admissionNumber} member={member} />
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
};

export default Registrations;
