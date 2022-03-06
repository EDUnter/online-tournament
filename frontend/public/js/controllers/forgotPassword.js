window.onload = () => {

    const btnForgotPwd = document.getElementById('btnLogin');
    const email = document.getElementById('emailInput');

    btnForgotPwd.addEventListener('click', async e => {
        e.preventDefault();

        recoverPwd();
    })

    const recoverPwd = async () => {
        let data = {
            email: email.value, 
        }
        
        try {
            let res = await fetch('http://localhost:4000/accounts/forgot-password', {
              method: 'POST',
              headers:  {
                'Content-Type': ' application/json'
              },
              body: JSON.stringify(data)
            });
            
            if(res.status == 200) {
              let response = await res.json();
              alert('hello');
              location.href = "http://localhost:5500/frontend/public/views/index.html";
            }
        
          } catch(err) {
            console.log(err);
          }
    }
}