import { ImageIcon, VideoIcon, Music, FileText, Code, Archive, File } from 'lucide-react';

export function getFileIcon(fileType: string) {
  if (fileType.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />;
  if (fileType.startsWith("video/")) return <VideoIcon className="h-8 w-8 text-red-500" />;
  if (fileType.startsWith("audio/")) return <Music className="h-8 w-8 text-green-500" />;
  if (fileType === "application/pdf") return <FileText className="h-8 w-8 text-orange-500" />;
  if (fileType.includes("word")) return <FileText className="h-8 w-8 text-blue-700" />;
  if (fileType.includes("excel") || fileType.includes("spreadsheet")) return <FileText className="h-8 w-8 text-green-700" />;
  if (fileType.includes("powerpoint") || fileType.includes("presentation")) return <FileText className="h-8 w-8 text-red-700" />;
  if (fileType.includes("zip") || fileType.includes("rar") || fileType.includes("7z")) return <Archive className="h-8 w-8 text-gray-500" />;
  if (fileType.includes("text/") || fileType.includes("application/json")) return <Code className="h-8 w-8 text-gray-700" />;
  return <File className="h-8 w-8 text-gray-500" />;
}