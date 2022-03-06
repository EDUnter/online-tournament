window.onload = () => {

    const btnLogin = document.getElementById('btnLogin');
    const email = document.getElementById('emailInput');
    const pwd = document.getElementById('pwdInput');

    btnLogin.addEventListener('click', async e => {
        e.preventDefault();

        login();
    })

    const login = async () => {
        let data = {
            email: email.value, 
            password: pwd.value
        }
        
        try {
            let res = await fetch('http://localhost:4000/accounts/authenticate', {
              method: 'POST',
              headers:  {
                'Content-Type': ' application/json'
              },
              body: JSON.stringify(data)
            });
            
            if(res.status == 200) {
              let response = await res.json();
    
              document.cookie = `token=${response.jwtToken};`;
              document.cookie = `user_id=${response.id}`;
    
              location.href = "http://localhost:5500/frontend/public/views/index.html";
            }
        
          } catch(err) {
            console.log(err);
          }
    }
}