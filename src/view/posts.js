import { deletePostSubmit,updateTextPostSubmit,updatePrivacyPostSubmit} from "../view-controller/posts-model.js"

import{addLikePostSubmit,deleteLikePostSubmit} from "../view-controller/posts-actions-model.js"
import {getAllPostLikes} from "../controller/posts-actions.js"

import {currentUser} from "../controller/auth.js"

export const itemPost = (objPost) =>{
  const divElement = document.createElement('div');
  divElement.classList.add('form-post','m1')
  divElement.innerHTML = `
    <div class="user-post">
      <p class ="color-text">${objPost.email}</p>
      ${currentUser().uid === objPost.idUser ? ` <i id="btn-delete-${objPost.id}" class="fas fa-window-close icons"></i>`:``}     			
    </div>
    <form class="p2">			

      <p id="post-${objPost.id}">${objPost.textPost}</p>
      <textarea id="text-${objPost.id}" class="display-none" >${objPost.textPost}</textarea>

      <h3 class ="color-text" >Fecha de Publicación :${objPost.date}</h3>
      <div class="btn-actions m1">
        ${currentUser().uid === objPost.idUser 
          ? `
          <select id="options-privacy-${objPost.id}" class ="options-privacy">
            ${objPost.privacy === 'publico' 
            ?
              `<option value="publico">${objPost.privacy}</option>
                <option value="privado">privado</option>`

              : `<option value="privado">${objPost.privacy}</option>
                 <option value="publico">publico</option>`}                  
         </select> 
          `
        : ``}         

        <i id="btn-like-${objPost.id}" class="fas fa-heart icons m1 display-none"></i>
        <i id="btn-dislike-${objPost.id}" class="far fa-heart icons m1 "></i>                                 
        <label id="count-likes" class = "color-diferent"></label>

        ${currentUser().uid === objPost.idUser 
          ? ` <i id="btn-edit-${objPost.id}" class="fas fa-edit icons m1"></i>
              <i id="btn-save-${objPost.id}" class="fas fa-save icons m1"></i> ` : ``}
      </div>          
    </form> 
  `;     
  
  if(currentUser().uid === objPost.idUser && currentUser()!==null){
    // ELIMINAR POSTS 
    divElement.querySelector(`#btn-delete-${objPost.id}`).addEventListener('click',()=>deletePostSubmit(objPost))
  
    // EDITAR PRIVACIDAD 
    const state = divElement.querySelector(`#options-privacy-${objPost.id}`)
    state.addEventListener('change',()=>{
      const newPrivacy = state.value;    
      updatePrivacyPostSubmit(objPost,newPrivacy)
    });
  
    // EDITAR POST 
    divElement.querySelector(`#btn-edit-${objPost.id}`)
    .addEventListener('click',()=>{
        const textareaPost = divElement.querySelector(`#text-${objPost.id}`)      
        textareaPost.classList.remove('display-none')
  
        const post = divElement.querySelector(`#post-${objPost.id}`)
        post.classList.add('display-none')   
    })
  
    divElement.querySelector(`#btn-save-${objPost.id}`)
    .addEventListener('click',()=>{
        const textareaPost = divElement.querySelector(`#text-${objPost.id}`) 
        const newTextPost = textareaPost.value;
  
        updateTextPostSubmit(objPost,newTextPost);
        
        textareaPost.classList.add('display-none')
        const post = divElement.querySelector(`#post-${objPost.id}`)
        post.classList.remove('display-none')   
    })
  }

  
  if(currentUser()!== null){
     // LIKES
    const btnLike = divElement.querySelector(`#btn-like-${objPost.id}`);
    const btnDislike = divElement.querySelector(`#btn-dislike-${objPost.id}`)
    getAllPostLikes (objPost.id,likes=>{
    // conteo de todos los likes 
      let allLikes = likes.length
      divElement.querySelector("#count-likes").innerHTML = allLikes

    // verificar si el usuarioActivo dio like
      const userLike = likes.find( like=>like.idUser === currentUser().uid)
      
      if(userLike === undefined){
        // no dieron like           
        btnDislike.addEventListener('click',()=>{   
          addLikePostSubmit(objPost,currentUser())
          btnDislike.classList.add('display-none');
          btnLike.classList.remove('display-none');      
        })

      }else{
        // si dieron like
        btnDislike.classList.add('display-none')
        btnLike.classList.remove('display-none')
        btnLike.addEventListener('click',()=>{   
          deleteLikePostSubmit(objPost,userLike)
          btnLike.classList.add('display-none');
          btnDislike.classList.remove('display-none');
        })
      }
    })
  }
  return divElement; 
}
