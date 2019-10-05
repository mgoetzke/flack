module CableServices
  class NotifyMessagesService
    attr_reader :project, :action, :user
    def initialize(params)
      @message = params[:message]
      @action = params[:action]
      @user = params[:user]
    end

    def self.call(params)
      new(params).send(:perform)
    end

    private
    def perform
      if action == :edit
        Cables::ProjectItemDomJob.perform_later(message)
      end
    end
  end
end