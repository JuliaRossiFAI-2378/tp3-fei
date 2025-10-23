import styles from "./modules/Frame.module.css"

const Frame = ({children}) => {
    return (
        <div className={styles.frame}>
            {children}
        </div>
    );
};

export default Frame;

