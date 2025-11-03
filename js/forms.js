// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorElement = input.parentElement.querySelector('.form-error');
        
        // Remove previous error state
        input.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }

        // Validate email
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Validate phone
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                showError(input, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        }

        // Check required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
    });

    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    let errorElement = input.parentElement.querySelector('.form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Handle form submission
function handleFormSubmit(form, successMessage) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Show success message
        const successElement = form.querySelector('.form-success');
        if (successElement) {
            successElement.textContent = successMessage || 'Thank you! Your form has been submitted successfully.';
            successElement.classList.add('show');
        }

        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            if (successElement) {
                successElement.classList.remove('show');
            }
        }, 3000);

        // Here you would normally send the form data to your backend
        // For now, we'll just log it
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Form data:', data);

        // Example: Send to backend API
        // try {
        //     const response = await fetch('/api/submit-form', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     if (response.ok) {
        //         // Success handling
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    });
}

// Initialize all forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        handleFormSubmit(form);

        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') || input.value) {
                    validateForm(form);
                }
            });
        });
    });
});

// Modal handling for enrollment forms
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Close modal buttons
document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            closeModal(modal.id);
        }
    });
});

// Open enrollment modal
document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-modal');
        openModal(modalId);
    });
});




