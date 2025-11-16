import { Paper } from "@mui/material";

export default function InfoText({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <Paper className={`p-4 bg-blue-50 border-l-4 border-blue-400 ${className}`} elevation={1}>
            {children}
        </Paper>
    );
}