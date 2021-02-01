import { ADD_COMMENT } from "../actions/action_types"  
export const addComment = comment =>  
 (  
     {   
         type: ADD_COMMENT,   
         payload: comment   
     }  
); 

