import styles from './PlaylistTrack.module.scss'

export default function PlaylistTrack({
    id, imgSrc, name, artists
}) {
    
    return (
        <div className={styles["playlistTrack"]}>
            <img src={imgSrc} alt="" />
            <div>
                <p>{name}</p>
                <span>{artists}</span>
            </div>
        </div>
    )
}