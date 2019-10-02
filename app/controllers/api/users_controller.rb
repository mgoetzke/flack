class Api::UsersController < ApplicationController

  rescue_from ActiveRecord::RecordNotUnique, with: :render_duplicate_email_response
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  def show
    render :show
  end

  def patch
  end

  private
  def user_params
    params.require(:user).permit(:email, :display_name, :password)
  end

  def render_duplicate_email_response
    render json: ["Account already exists for this email"], status: :not_found
  end
end
