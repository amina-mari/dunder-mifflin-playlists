import styles from './link.module.scss'
import Link from 'next/link'

export default function LinkComponent({children, href}) {
    return (
        <Link href={href} className={styles["link"]}>
            {children} 
        </Link>
    )
}