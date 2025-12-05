document.addEventListener('DOMContentLoaded',function(){
  // Project modal
  var modal = document.getElementById('project-modal');
  var modalTitle = modal && modal.querySelector('.modal-title');
  var modalDesc = modal && modal.querySelector('.modal-desc');
  var modalImg = modal && modal.querySelector('.modal-img');
  var modalTech = modal && modal.querySelector('.modal-tech');
  var closeBtn = modal && modal.querySelector('.modal-close');

  function openModal(card){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    modalTitle.textContent = card.dataset.title || '';
    modalDesc.textContent = card.dataset.desc || '';
    modalTech.textContent = 'Tech: ' + (card.dataset.tech || '');
    modalImg.src = card.dataset.img || '';
    modalImg.alt = card.dataset.title || '';

    // Add links if present
    var links = modal.querySelector('.modal-links');
    if(links){
      links.innerHTML = '';
      if(card.dataset.live && card.dataset.live !== '#'){
        var a1 = document.createElement('a');a1.href = card.dataset.live;a1.target='_blank';a1.rel='noopener';a1.textContent='Live Site';a1.className='btn ghost';links.appendChild(a1);
      }
      if(card.dataset.src && card.dataset.src !== '#'){
        var a2 = document.createElement('a');a2.href = card.dataset.src;a2.target='_blank';a2.rel='noopener';a2.textContent='Source';a2.className='btn ghost';links.appendChild(a2);
      }
    }
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
  }

  document.querySelectorAll('.open-project').forEach(function(btn){
    btn.addEventListener('click',function(e){
      var card = e.target.closest('.project-card');
      openModal(card);
    });
  });
  if(closeBtn){closeBtn.addEventListener('click',closeModal)}
  window.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});

  // Contact form handling (local success UI; replace with Formspree flow when configured)
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('form-success');
  if(contactForm){
    contactForm.addEventListener('submit',function(e){
      // let the browser submit to Formspree but show a friendly message
      setTimeout(function(){
        if(formSuccess){formSuccess.hidden = false}
      },300);
    });
  }

  // Mailto fallback form handler
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.dataset.email || '';
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent('Name: ' + name + "\n" + 'Email: ' + email + "\n\n" + message);

      if (to) {
        // open user's mail client
        window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;

        // show success message after a short delay
        var success = document.getElementById('form-success');
        if (success) {
          success.hidden = false;
          setTimeout(function () { success.hidden = true; }, 5000);
        }

        form.reset();
      } else {
        alert('No recipient email configured.');
      }
    });
  }

});