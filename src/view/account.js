import{signUpSubmit} from "../view-controller.js"

export default ()=>{
    const form = document.createElement('div');
    const formContent = `
    <div class="container p1">
			<section class="img-content center-content m1 p2 ">
				<img src="img/intro.png">
			</section>
			<section class="forms-content  m1 p2 ">
				<article class="register-login p4 ">
					<img alt ='logo' src="img/loogo.png" class="img-logo">
					<h2> Registrate </h2>				
					<form>
						<div class="form-group">
								<label  for="name">Nombre</label>
								<input class="form-control" id="name" type="text" placeholder="Ingresa tu nombre" required/>
							</div>
							<div class="form-group">
								<label  for="email">Email</label>
								<input class="form-control" id="email" type="email" placeholder="Ingresa tu email" required/>
							</div>
							<div class="form-group">
								<label for="password">Password</label>
								<input class="form-control" id="password" type="password" placeholder="Ingresa tu contraseña" required/>
							</div>
							<div class="form-group">
							<button id="btn-singUp" type="submit">Registrar</button>
						</div>                
					</form>
				</article> 
			</section>
		</div>  `;

    form.innerHTML = formContent;
    const btnSignUp = form.querySelector('#btn-singUp')
    btnSignUp.addEventListener('click',signUpSubmit);
    return form;
}