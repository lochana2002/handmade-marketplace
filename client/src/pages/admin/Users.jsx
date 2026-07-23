import { useEffect, useState } from "react";
import api from "../../services/api";

function Users() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {

    fetchUsers();

  }, []);



  const fetchUsers = async () => {

    try {

      const res = await api.get("/admin/users");

      setUsers(res.data);

    } catch(error) {

      console.log(error);

    }

  };



  const filteredUsers = users.filter((user)=>


    user.name
    .toLowerCase()
    .includes(search.toLowerCase())

    ||

    user.email
    .toLowerCase()
    .includes(search.toLowerCase())


  );



  return (

    <div>


      <div className="flex justify-between items-center mb-8">


        <div>

          <h1 className="text-3xl font-bold">
            Users Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage buyers, sellers and admins
          </p>

        </div>


        <input

          type="text"

          placeholder="Search users..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          border
          rounded-xl
          px-4
          py-3
          w-72
          outline-none
          focus:ring-2
          focus:ring-orange-500
          "

        />


      </div>




      <div className="
      bg-white
      rounded-2xl
      shadow
      overflow-hidden
      ">


        <table className="w-full">


          <thead className="
          bg-gray-100
          ">

            <tr>

              <th className="p-4 text-left">
                User
              </th>


              <th className="p-4 text-left">
                Email
              </th>


              <th className="p-4 text-left">
                Role
              </th>


              <th className="p-4 text-left">
                Joined
              </th>


              <th className="p-4 text-left">
                Action
              </th>


            </tr>

          </thead>




          <tbody>


          {
            filteredUsers.map((user)=>(


              <tr
              key={user._id}
              className="
              border-t
              hover:bg-gray-50
              "
              >



                <td className="p-4">

                  <div className="flex items-center gap-3">


                    <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-orange-500
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    ">

                      {user.name.charAt(0)}

                    </div>


                    <span className="font-medium">

                      {user.name}

                    </span>


                  </div>

                </td>





                <td className="p-4 text-gray-600">

                  {user.email}

                </td>





                <td className="p-4">


                  <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-medium

                  ${
                    user.role==="admin"
                    ?
                    "bg-red-100 text-red-600"

                    :

                    user.role==="seller"
                    ?
                    "bg-green-100 text-green-600"

                    :

                    "bg-blue-100 text-blue-600"
                  }

                  `}
                  >

                    {user.role}

                  </span>


                </td>





                <td className="p-4 text-gray-500">

                  {
                    new Date(user.createdAt)
                    .toLocaleDateString()
                  }

                </td>





                <td className="p-4">


                  <button
                  className="
                  text-orange-600
                  hover:underline
                  "
                  >

                    View

                  </button>


                </td>



              </tr>


            ))
          }


          </tbody>


        </table>



        {
          filteredUsers.length===0 &&

          <p className="
          text-center
          p-8
          text-gray-500
          ">

            No users found

          </p>
        }


      </div>



    </div>

  );

}

export default Users;