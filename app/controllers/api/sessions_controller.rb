class Api::SessionsController < ApplicationController
  def destroy
    if(current_user)
      cookies.signed[:user_id] = nil
      logout!
      render json: { text: "json text session destroyed" }
    else
      render :json => {:error => "not-found"}.to_json, :status => 404
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], 
    params[:user][:password])
    if @user
      session[:user_id] = @user.id
      cookies.signed[:user_id] = session[:user_id]
      login(@user)
      render @user
    else
      render json: ['Sorry, you entered an incorrect email address or password.'], status: 404
    end
  end
end