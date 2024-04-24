
function Card(){
    return(
        <div className="card">
            <label for="user_pass">Username:</label><br />
            <input type="text" id="user_pass" ></input><br />
            <label for="user_pwd">Password:</label><br />
            <input type="text" id="user_pwd" ></input><br />
            <input type="button" value="Submit"></input>
        </div>
    );
}

export default Card