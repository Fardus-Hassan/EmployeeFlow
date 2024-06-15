
import { TbLoader3 } from "react-icons/tb";

const Spinner = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white dark:bg-themeColor z-[100]">
            <TbLoader3 className="text-7xl text-pmColor animate-spin"/>
        </div>
    );
};

export default Spinner;