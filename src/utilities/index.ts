import { BaseModel } from '@/models';
import { toggleModal } from './modal_access';

// link: https://stackoverflow.com/a/52430020/11592761
// diff between just two arrays:
function arrayDiff(a: Array<BaseModel>, b: Array<BaseModel>) {
    return [
        ...a.filter(x => !b.includes(x)),
        ...b.filter(x => !a.includes(x))
    ];
}


export { toggleModal, arrayDiff };