
class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection
    # wrap_parameters include: User.attribute_names + ['password']
    protect_from_forgery with: :exception
    before_action :snake_case_params, :attach_authenticity_token


    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        if !logged_in?
            render json: {errors: ['Must be logged in']}, status: 401
        end
    end

    def require_logged_out
        if logged_in?
            render json: {errors: ['Must be logged out']}, status: 403
        end
    end

    def logged_in?
        !!current_user
    end

    def login(user)
       session[:session_token] = user.reset_session_token!
       @current_user = user
    end

    def logout 
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def test
        if params.has_key?(:login)
          login(User.first)
        elsif params.has_key?(:logout)
          logout
        end
      
        if current_user
          render json: { user: current_user.slice('id', 'username', 'session_token') }
        else
          render json: ['No current user']
        end
      end

    private
    #this goes into params and deep trasnforms any camelCase keys and turns then all into snake_case for ruby to read
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
    # helper method to add a header to ever single response, this method is to add an authenticity token 
    def attach_authenticity_token
        headers['X-CSRF-Token'] = form_authenticity_token 
    end

end