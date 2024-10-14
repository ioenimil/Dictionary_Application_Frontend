
interface FormProps{
    e:React.FormEvent<HTMLFormElement>,
    password:string,
    email:string
}
export const handleSubmit = ({e}:FormProps)=>{
    e.preventDefault();
    console.log("Clicked!");
    

}