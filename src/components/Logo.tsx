interface LogoProps {
    height?: string;
    width?: string;
    default?: string;
}

export default function Logo(props: LogoProps) {
    const { height, width } = props;

    return (
        <a href={props.default}>
            <img
                src="../../public/images/ShoeWizards.png"
                alt="MealsHub"
                className={`flex object-contain 
                    ${height ? `h-${height}` : ""} 
                    ${width ? `w-${width}` : ""}`}
            />
        </a>
    );
}
