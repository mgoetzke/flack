class Api::SessionsController < ApplicationController
  def destroy
    if(current_user)
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
      login(@user)
      render @user
    else
      render :json => {:error => "invalid credentials"}.to_json, :status => 404
    end
  end
end