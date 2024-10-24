const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.left}>:::CS472-WAP</div>
            <div style={styles.right}>&copy; October 2024</div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#f1f1f1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0px',
        position: 'fixed',
        bottom: '0',
        width: '100%',
    },
    left: {
        textAlign: 'left',
        padding: '0px 0px 0px 10px'
    },
    right: {
        textAlign: 'right',
        padding: '0px 20px 0px 0px'
    }
};

export default Footer;