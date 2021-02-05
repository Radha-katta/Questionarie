import { Questions } from "./questions.model";

export class TopModel {


    constructor( public resourceType:string, public  status:string, public  date:string, 
        public identifier?:string,  public url?: string, public  subjectType?:any[],  public  item?: Questions[] ){
          
    }

}