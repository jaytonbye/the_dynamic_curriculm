import { Query } from "./index";


const getAvails = async() => {
return await Query ("select * from coaches_availability")
}


export default {
    getAvails
}