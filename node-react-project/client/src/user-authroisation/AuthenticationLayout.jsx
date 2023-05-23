import AuthenticationContent from "./AuthenticationContent";
import UserLogin from "./UserLogin";

function AuthenticationLayout() {
  return (
    <div className="full-screen center-content row wrap scroll-overflow-y gradient-bg">
      <UserLogin />
      <AuthenticationContent />
    </div>
  );
}

export default AuthenticationLayout;
