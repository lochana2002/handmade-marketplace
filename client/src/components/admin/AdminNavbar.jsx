import { useAuth } from "../../context/AuthContext";


function AdminNavbar() {

const { user, logout } = useAuth();


return (

<div className="
flex
justify-between
items-center
bg-white
px-8
py-5
shadow
">


<div>

<h1 className="text-2xl font-bold">
Admin Dashboard
</h1>


<p className="text-gray-500">
Welcome back, {user?.name}
</p>


</div>


<button

onClick={logout}

className="
bg-red-500
text-white
px-5
py-2
rounded-xl
"

>

Logout

</button>


</div>

);

}


export default AdminNavbar;