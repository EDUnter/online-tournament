window.onload = () => {

    const verifyEmail = async () => {

        const params = new URLSearchParams(window.location.search);
        let token = null;
        for (const param of params) {
            token = param[1];
        }

        let data = {
            token: token
        }

        try {
            let res = await fetch('http://localhost:4000/accounts/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': ' application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.status == 200) {
                let response = await res.json();

                Swal.fire(
                    'Good job!',
                    'Your email accout was verified successfully, you can sign in now!',
                    'success'
                )
            }

        } catch (err) {
            console.log(err);
        }
    }

    verifyEmail();
}
