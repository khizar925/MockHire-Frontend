import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Combobox } from "../components/ui/combobox";

export default function InterviewForm({ onClose, interviewData = [] }) {
    const roles = [...new Set(interviewData.map((i) => i.title))];
    const durations = ["3 min", "5 min"];

    const [resume, setResume] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Schedule Interview</DialogTitle>
                    <DialogDescription>Please fill in the details below.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Combobox
                        label="Role"
                        options={roles}
                        value={selectedRole}
                        onChange={setSelectedRole}
                    />
                    <Combobox
                        label="Interview Duration"
                        options={durations}
                        value={selectedDuration}
                        onChange={setSelectedDuration}
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Resume</label>
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResume(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
