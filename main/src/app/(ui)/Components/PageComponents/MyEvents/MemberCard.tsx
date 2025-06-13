import { motion } from "framer-motion";
import Image from "next/image";


interface TeamMember {
  admissionNumber: string;
  name: string;
  year: string;
  branch: string;
  profilePicture?: string;
}

const generateAvatarData = (name: string) => {
  const colors = [
    'bg-blue-400', 'bg-green-400', 'bg-purple-400', 
    'bg-pink-400', 'bg-indigo-400', 'bg-teal-400'
  ];

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const avatarColor = colors[colorIndex];

  return { initials, avatarColor };
};

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const { initials, avatarColor } = generateAvatarData(member.name);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-6 text-center shadow-md flex flex-col items-center"
    >
      {member.profilePicture ? (
        <Image 
          src={member.profilePicture} 
          alt={member.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100" 
        />
      ) : (
        <div 
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 ${avatarColor}`}
        >
          {initials}
        </div>
      )}
      <p className="font-semibold text-blue-900">{member.name}</p>
      <p className="text-sm text-blue-600">{member.year} - {member.branch}</p>
    </motion.div>
  );
};

export default MemberCard