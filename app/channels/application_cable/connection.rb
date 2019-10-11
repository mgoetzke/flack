module ApplicationCable
class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private
      def find_verified_user
        if current_user = User.find_by(session_token: request.session_options[:id])
          current_user
        # else
        #   reject_unauthorized_connection
        end
      end
  end
end
