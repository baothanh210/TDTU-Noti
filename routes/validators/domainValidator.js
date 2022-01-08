/*
 * Input: Student's email 
 * Ouput: int value 1 - true, 0 - false 
 * Function: it will check if the student includes '@student.tdtu.edu.vn' or not
 */
 function domainCheck(email){
    var result = 0
    var domain = '@student.tdtu.edu.vn'
    if(email.includes(domain, 8)){
        result = 1
    }
    return result
}

module.exports = domainCheck