import {Table,TableCaption, TableHeader,TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {Avatar,AvatarImage} from "@/components/ui/avatar"
import {Popover,PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent register companies </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                    <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1658204238967-3a81a063d162?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2324" />
                    </Avatar>
                </TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>18-07-2025</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger ><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className="flex items-center gap-2 w-fit cursor-pointer">
                                <Edit2 />
                                <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable