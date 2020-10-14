(function($) {
	
	'use strict';
	
	// Extend core script
	$.extend($.nmTheme, {
		
		/**
		 *	Initialize checkout scripts
		 */
		checkout_init: function() {
            var self = this;
            
            
            /* Bind: Login link */
            $('.showlogin').bind('click.nmShowForm', function(e) {
                e.preventDefault();
                self.loginCouponShowForm('#nm-checkout-login-form', 'nm-login-popup');
            });
            
            
            /* Bind: Coupon link */
            $('.showcoupon').bind('click.nmShowForm', function(e) {
                e.preventDefault();
                self.loginCouponShowForm('#nm-coupon-login-form', 'nm-coupon-popup');
            });
            
            
            /* Bind: Payment methods input/radio-button */
            var paymentsAnim = false;
            self.$document.on('change', '.wc_payment_methods li > .input-radio', function(e) {
                var $this = $(this).parent('li'),
                    $active = $this.parent('.wc_payment_methods').children('.active');
                
                $active.removeClass('active');
                $this.addClass('active');
                
                if (!paymentsAnim) {
                    $active.children('.payment_box').hide();
                    $this.children('.payment_box').show();
                }
            });
            
            
            if (nm_wp_vars.checkoutTacLightbox !== '0') {
                /* Unbind: T&C link - Default WooCommerce "click" event */
                $(document.body).off('click', 'a.woocommerce-terms-and-conditions-link');
                /* Bind: T&C link */
                self.$document.on('click', '.woocommerce-terms-and-conditions-link', function(e) {
                    e.preventDefault();
                    
                    var $popupContent = $('.woocommerce-terms-and-conditions');
                    $popupContent.addClass('entry-content'); // Add class for content styling
                    
                    $.magnificPopup.open({
                        mainClass: 'nm-checkout-tac-popup nm-mfp-fade-in',
                        closeMarkup: '<a class="mfp-close nm-font nm-font-close2"></a>',
                        removalDelay: 180,
                        items: {
                            src: $popupContent,
                            type: 'inline'
                        }
                    });
                });
            }
		},
        
        
        /**
		 *    Login/Coupon: Show popup form
		 */
		loginCouponShowForm: function($formContainer, containerClass) {
            $.magnificPopup.open({
                mainClass: containerClass + ' nm-mfp-fade-in',
                alignTop: true,
                closeMarkup: '<a class="mfp-close nm-font nm-font-close2"></a>',
                removalDelay: 180,
                items: {
                    src: $formContainer,
                    type: 'inline'
                }
            });
        }
		
	});
	
	// Add extension so it can be called from $.nmThemeExtensions
	$.nmThemeExtensions.checkout = $.nmTheme.checkout_init;
	
})(jQuery);
