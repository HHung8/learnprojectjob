    import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
    import {Badge} from "@/components/ui/badge";
    import { useSelector } from "react-redux";

    const AppliedJobTable = () => {
        const {allAppliedJobs} = useSelector(store => store.job);
        console.log(`check log allAppliedJobs`, allAppliedJobs);
        return (
            <div>
                <Table>
                    <TableCaption>A list of your applied jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet</span> : allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob.id}>
                                    <TableCell>{appliedJob?.created_at?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob?.title}</TableCell>
                                    <TableCell>{appliedJob?.company_name}</TableCell>
                                    <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                                </TableRow>
                            )) 
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }

    export default AppliedJobTable