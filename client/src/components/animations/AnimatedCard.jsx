import AnimatedSection from "./AnimatedSection";


function AnimatedCard({children,index}) {


return (

<AnimatedSection

animation="fadeUp"

delay={index * 0.15}

>

{children}

</AnimatedSection>

)

}


export default AnimatedCard;