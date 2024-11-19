import OutcomeTable from "@/components/page/table";
import {DatePickerForm} from "@/components/page/dashboard";

export default function Page() {
    return (
        <div className="flex  items-center justify-center px-4">
            <DatePickerForm/>
            {/* <OutcomeTable /> */}
        </div>
    )
}
