import Button from "./Button";

export default function FlexButton({label, signal, onClick}){

    return (
        <div className="flex justify-end">
                <div className="fixed top-[85px] right-6">
                    <Button name={label} signal={signal} onClick={onClick}/>
                </div>
            </div>
    )
}