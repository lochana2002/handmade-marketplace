import { motion } from "framer-motion";


const animations = {

  fadeUp:{
    hidden:{
      opacity:0,
      y:60,
    },

    visible:{
      opacity:1,
      y:0,
      transition:{
        duration:0.8,
        ease:"easeOut"
      }
    }
  },


  fadeLeft:{
    hidden:{
      opacity:0,
      x:-80,
    },

    visible:{
      opacity:1,
      x:0,
      transition:{
        duration:0.8,
        ease:"easeOut"
      }
    }
  },


  fadeRight:{
    hidden:{
      opacity:0,
      x:80,
    },

    visible:{
      opacity:1,
      x:0,
      transition:{
        duration:0.8,
        ease:"easeOut"
      }
    }
  },


  scale:{
    hidden:{
      opacity:0,
      scale:0.8
    },

    visible:{
      opacity:1,
      scale:1,
      transition:{
        duration:0.8
      }
    }
  }

};



function AnimatedSection({

children,
animation="fadeUp",
delay=0,
className=""

}) {


return (

<motion.div

className={className}

variants={animations[animation]}

initial="hidden"

whileInView="visible"

viewport={{
once:true,
amount:0.2
}}

transition={{
delay
}}

>

{children}

</motion.div>

)

}


export default AnimatedSection;