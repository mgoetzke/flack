class Api::DirectsController < ApplicationController
  def create
    @direct = Direct.new()
    if @direct.save
      params[:users].each do |user|
        Membership.create(user_id: user.id, memberable_id: @direct.id, memberable_type: Direct)
      end
    else
      render json: @direct.errors.full_messages, status: 422
    end
  end
  def index
  end
  def show
  end
end