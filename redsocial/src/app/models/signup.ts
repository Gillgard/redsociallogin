export class Signup {

    constructor(user_id = '', f_name = '', l_name = '', user_pass = '', user_email = '', user_country = '', user_gender = '', user_birth = '') {
        this.user_id = user_id;
        this.f_name = f_name;
        this.l_name = l_name;
        this.user_pass = user_pass;
        this.user_email = user_email; 
        this.user_country = user_country;
        this.user_gender = user_gender;
        this.user_birth = user_birth;
    }

    user_id: String;
    f_name: String;
    l_name: String;
    user_pass: String;
    user_email: String; 
    user_country: String;
    user_gender: String;
    user_birth: String;
}
