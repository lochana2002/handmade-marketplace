import { useState } from "react";
import api from "../services/api";

import {
  FaRobot,
  FaTimes,
  FaPaperPlane
} from "react-icons/fa";


function AIChat() {

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);



  const sendMessage = async () => {

    if (!message.trim()) return;


    const currentMessage = message;


    setChat((prev)=>[
      ...prev,
      {
        role:"user",
        text:currentMessage
      }
    ]);


    setMessage("");



    try {

      const res = await api.post(
        "/ai/chat",
        {
          message: currentMessage
        }
      );


      setChat((prev)=>[
        ...prev,
        {
          role:"ai",
          text:res.data.reply
        }
      ]);


    } catch(err) {


      setChat((prev)=>[
        ...prev,
        {
          role:"ai",
          text:"Sorry, something went wrong."
        }
      ]);


      console.log(err);

    }

  };




  return (

    <>


      {/* FLOATING BOT BUTTON */}

      <button

        onClick={()=>setIsOpen(!isOpen)}

        className="
          fixed
          bottom-6
          right-6
          w-16
          h-16
          rounded-full
          bg-gradient-to-r
          from-orange-400
          to-amber-500
          text-white
          shadow-2xl
          hover:scale-110
          transition-all
          duration-300
          z-50
          flex
          items-center
          justify-center
          text-2xl
          animate-pulse
        "

      >

        {
          isOpen
          ?
          <FaTimes />
          :
          <FaRobot />
        }


      </button>





      {/* CHAT WINDOW */}

      {
        isOpen && (

          <div

            className="
              fixed
              bottom-24
              right-6
              w-96
              h-[550px]
              bg-white
              rounded-3xl
              shadow-2xl
              border
              overflow-hidden
              flex
              flex-col
              z-50
            "

          >



            {/* HEADER */}

            <div

              className="
                bg-gradient-to-r
                from-orange-400
                to-amber-500
                text-white
                p-5
              "

            >

              <h2 className="
                font-bold
                text-lg
                flex
                items-center
                gap-2
              ">

                <FaRobot />

                Handmade AI Assistant

              </h2>


              <p className="
                text-sm
                mt-1
                opacity-90
              ">

                Ask me about products, gifts and marketplace help.

              </p>


            </div>





            {/* MESSAGES */}

            <div

              className="
                flex-1
                overflow-y-auto
                p-4
                space-y-3
                bg-gray-50
              "

            >


              {
                chat.length === 0 ? (

                  <div className="
                    text-center
                    text-gray-500
                    mt-10
                  ">

                    <p className="text-3xl">
                      👋
                    </p>

                    <p>
                      Hi!
                    </p>

                    <p className="text-sm mt-2">

                      Ask me for gift ideas,
                      product recommendations,
                      or marketplace help.

                    </p>

                  </div>


                ) : (


                  chat.map((item,index)=>(


                    <div

                      key={index}

                      className={`
                        max-w-[80%]
                        rounded-2xl
                        px-4
                        py-3
                        text-sm

                        ${
                          item.role==="user"
                          ?
                          "bg-orange-400 text-white ml-auto"
                          :
                          "bg-white shadow text-gray-700"
                        }

                      `}

                    >

                      {item.text}


                    </div>


                  ))


                )

              }


            </div>







            {/* INPUT AREA */}

            <div

              className="
                border-t
                p-3
                flex
                gap-2
                bg-white
              "

            >


              <input

                type="text"

                placeholder="Ask something..."

                value={message}

                onChange={(e)=>setMessage(e.target.value)}

                onKeyDown={(e)=>{

                  if(e.key==="Enter")
                    sendMessage();

                }}

                className="
                  flex-1
                  border
                  rounded-xl
                  px-4
                  py-2
                  outline-none
                  focus:border-orange-500
                "

              />



              <button

                onClick={sendMessage}

                className="
                  bg-orange-500
                  text-white
                  w-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  hover:bg-orange-600
                  transition
                "

              >

                <FaPaperPlane />

              </button>


            </div>



          </div>

        )

      }



    </>

  );

}


export default AIChat;