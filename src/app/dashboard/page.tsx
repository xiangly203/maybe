import OutcomeTable from "@/components/page/table";
import { DateRangePickerForm} from "@/components/page/dashboard";

export default function Page() {
    return (
        <div className="flex  items-center justify-center px-4">
            <DateRangePickerForm/>
            {/* <OutcomeTable /> */}
        </div>
    )
}
