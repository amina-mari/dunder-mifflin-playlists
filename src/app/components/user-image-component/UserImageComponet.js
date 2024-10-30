import Image from "next/image"

export default function UserImageComponent({imgSrc}) {
    return (
        <div>
            <Image src={imgSrc}/>
        </div>
    )
}