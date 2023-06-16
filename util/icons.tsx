interface IconProps {
    className: string
    height?: string
    width?: string
}

export const NextSVG = ({className, height, width, ...rest}: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 394 80"
      height={height}
      width={width}
      className={className}
      {...rest}
    >
      <path
        fill="#000"
        d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"
      />
      <path
        fill="#000"
        d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"
      />
    </svg>
  )

  export const VercelSVG = ({className, height, width, ...rest}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 283 64"
    height={height}
      width={width}
    {...rest}
  >
    <path
      fill="#000"
      d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z"
    />
  </svg>
)

export const LogoSVG = ({className, height, width, ...rest}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    className={`icon line-color ${className}`}
    data-name="Line Color"
    viewBox="0 0 24 24"
    {...rest}
  >
    <path
      d="M12 10v4l1.4 1.57"
      style={{
        fill: "none",
        stroke: "#2ca9bc",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      d="m17.3 8.2 1.5-1.5M6.7 8.2 5.2 6.7M12 6V3M9 3h6"
      data-name="secondary"
      style={{
        fill: "none",
        stroke: "#2ca9bc",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <circle
      cx={12}
      cy={13.5}
      r={7.5}
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
)


export const HomeImage = ({className, height, width, ...rest}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 770.936 732.5"
    className={className}
    {...rest}

  >
    <path
      fill="#f2f2f2"
      d="M733.063 173.91c.375-.553 9.704 8.838 18.188 6.906 10.57-2.408 18.302-22.04 12.57-30.437-3.793-5.557-13.227-5.818-13.03-6.86.21-1.116 10.362 2.623 15.885-1.843 6.71-5.424 5.308-21.921-2.9-30.574-1.643-1.732-4.371-4.607-8.29-4.835-7.695-.448-13.736 9.683-16.391 14.136-8.443 14.157-9.135 29.01-10.176 28.871-.963-.128 1.593-12.558-3.04-15.103-1.015-.557-2.22-.55-3.419-.272.303-.785.522-1.592.632-2.422.695-5.235-3.464-10.8-8.378-15.465 5.118 3.032 10.903 5.134 16.022 3.63 11.433-3.359 19.041-24.559 13.03-37.573-4.198-9.09-14.904-13.892-14.55-14.413.374-.551 9.703 8.84 18.188 6.907 10.57-2.407 18.302-22.04 12.57-30.436-3.793-5.558-13.227-5.819-13.031-6.861.21-1.115 10.363 2.623 15.886-1.842 6.71-5.425 5.307-21.922-2.901-30.575-1.643-1.731-4.37-4.607-8.289-4.835-7.695-.447-13.737 9.684-16.392 14.137-8.443 14.157-9.134 29.01-10.176 28.87-.963-.128 1.594-12.557-3.04-15.102-2.9-1.594-7.362 1.379-8.748 2.302-15.24 10.153-11.016 32.23-25.095 55.716-4.533 7.563-9.049 12.078-12.86 15.494-1.74-21.029 4.671-37.172-5.042-49.4-1.035-1.303-4.37-5.501-7.62-4.875-5.19 1.001-6.57 13.616-7.526 13.443-1.034-.187 2.864-14.536-.828-30.6-1.161-5.054-3.804-16.55-11.265-18.484-3.799-.986-7.278.914-9.372 2.058-10.468 5.718-16.863 20.99-12.141 28.21 3.887 5.945 14.697 5.502 14.554 6.627-.133 1.053-9.192-1.593-14.507 2.533-8.032 6.233-6.695 27.29 2.626 32.825 7.483 4.442 19.243-1.634 19.43-.994.177.604-11.486 1.89-18.27 9.254-2.816 3.056-4.748 7.12-5.84 11.513-9.24.694-17.147 7.314-17.443 6.804-.335-.577 12.173-4.91 14.112-13.393 2.414-10.569-11.922-26.05-21.974-24.527-6.653 1.008-10.98 9.396-11.834 8.767-.914-.673 6.858-8.2 5.23-15.113-1.978-8.399-17.451-14.29-28.808-10.646-2.272.73-6.047 1.94-7.951 5.372-3.74 6.74 2.768 16.577 5.629 20.9 9.095 13.748 22.178 20.813 21.601 21.691-.533.812-10.624-6.882-14.927-3.811-2.694 1.922-1.95 7.232-1.72 8.881 2.54 18.135 24.264 23.904 39.322 46.775 12.261 18.625 7.03 28.733 17.418 33.78 4.46 2.168 10.138 2.587 15.942 1.544-4.492 30.078-5.762 81.517-5.762 81.517-1.267 51.453-7.882 93.827-10.778 93.745-1.607-.048-1.015-13.01-5.886-33.851-3.418-14.613-5.032-13.94-13.907-40.012-14.085-41.36-21.126-62.032-21.141-62.145-.075-.9-.198-2.714-.713-4.55 10.425-2.917 20.548-10.39 24.065-20.877 2.813-8.39 2.074-20.852-4.77-25.342-4.414-2.897-11.232-1.563-17.567.842 4.952-3.296 9.355-7.598 10.22-12.862 1.931-11.76-13.872-27.808-28.206-28.036-10.01-.16-18.981 7.405-19.297 6.86-.335-.576 12.173-4.91 14.112-13.393 2.414-10.568-11.922-26.05-21.974-24.526-6.653 1.007-10.98 9.395-11.834 8.766-.914-.673 6.858-8.2 5.23-15.113-1.978-8.398-17.451-14.29-28.808-10.645-2.272.729-6.047 1.94-7.951 5.371-3.74 6.74 2.768 16.577 5.629 20.901 9.095 13.747 22.178 20.812 21.601 21.69-.533.812-10.624-6.882-14.927-3.81-2.694 1.922-1.95 7.232-1.72 8.88 2.54 18.136 24.264 23.904 39.322 46.776 12.261 18.624 7.03 28.732 17.418 33.78 1.797.874 3.797 1.456 5.919 1.781v.01c.914 14.22 26.531 52.436 40.79 106.77 7.102 27.07 10.988 41.839 8.19 62.403-2.762 20.387-10.435 34.147-10.295 43.232.01.85.084 1.634.242 2.392l42.107-5.527c.283-.816.504-1.653.68-2.513 3.207-15.468-8.492-38.977-2.547-76.891 4.415-28.135 16.511-51.276 22.15-62.057 6.93-13.259 15.118-25.73 23.958-45.097 5.677 3.126 12.112 4.786 18.499 3.983 8.78-1.104 19.689-7.174 20.767-15.288.695-5.234-3.464-10.8-8.378-15.464 5.118 3.032 10.903 5.134 16.021 3.63 11.434-3.36 19.042-24.56 13.03-37.574-4.197-9.09-14.903-13.892-14.55-14.412Zm-171.31 13.862c-.03-.06.41-.252 1.175-.563-.721.405-1.144.624-1.175.563Zm139.977-81.865c-.678-.475-1.058-.76-1.017-.815.042-.054.405.26 1.017.815Zm-43.667 21.705c.753-.34 1.195-.527 1.217-.463.023.064-.426.22-1.217.463Zm-34.608 24.65c-.03-.06.41-.251 1.175-.562-.721.405-1.144.624-1.175.563Zm12.114 108.775c-1.011-.228 11.286-49.966 13.303-76.373 5.836-3.826 10.63-9.213 12.832-15.781.038-.114.073-.232.11-.348a37.861 37.861 0 0 0 3.478-.652c-4.115 10.405-6.411 17.96-6.411 17.96-10.686 35.205-22.39 75.405-23.312 75.194Zm45.895-16.238c-3.375 5.175-7.33 11.537-12.775 21.268-13.968 24.93-20.945 37.388-22.78 46.27-.482 2.372-3.026 15.2-8.855 31.459-2.98 8.297-4.469 12.445-5.602 12.276-3.21-.487-3.263-33.214 5.62-67.1 1.522-5.768 2.735-9.491 5.043-16.531 3.744-11.485 24.608-75.32 41.02-114.046l.003-.006c3.03-2.905 5.298-6.228 6.411-9.727.356-1.117.556-2.15.635-3.133 3.926 1.248 8.043 1.75 12.141 1.235 2.292-.288 4.728-.917 7.098-1.83-6.555 11.614-6.449 29.008-17.387 47.256-11.464 19.125-22.841 18.795-22.885 30.345-.029 7.67 4.965 16.155 12.318 22.256l-.005.008Zm23.097-33.454c.041-.054.404.259 1.017.814-.678-.474-1.059-.76-1.017-.814Z"
    />
    <path
      fill="#2f2e41"
      d="M264.226 161.61c6.429-1.072 13.425 6.78 16.347 10.06 7.801 8.755 9.43 18.94 10.06 23.263 9.94 68.226 14.911 102.338-5.659 118.205-19.548 15.079-55.281 11.035-62.246-2.515-2.713-5.278-.445-10.8 3.144-21.377 6.632-19.549 10.541-39.922 16.347-59.732 13.258-45.231 12.145-66.261 22.007-67.905ZM88.804 416.253 57.52 475.302C49.532 490.376 11.742 722.574 28.548 725.5l72.795 2.415 30.205 1.585 31.045.447 76.955 2.553-43.227-302.415-107.517-13.832Z"
    />
    <path
      fill="#6c63ff"
      d="m165.826 243.032 62.246 2.515 5.03 20.75 14.99 12.228a19.968 19.968 0 0 1 7.098 18.609l-6.998 43.983s13.204 31.438-20.12 51.558l-33.323 54.072-115.69-11.946s-10.689-1.257-3.144-8.802 16.976-44.642 16.976-44.642-1.257-16.347 3.144-20.748 1.337-15.72 1.337-15.72l17.902-66.174c3.488-12.895 15.188-21.85 28.546-21.85h19.853l2.153-13.833Z"
    />
    <path
      fill="#fff"
      d="M644.667 666.158 101.05 520.871c-11.614-3.104-19.707-12.448-21.121-24.387s4.272-22.915 14.84-28.646L315.69 348.022a28.866 28.866 0 0 1 18.378-3.093l365.157 60.197c7.795 1.285 14.55 5.581 19.022 12.095s6.05 14.361 4.447 22.097l-42.462 204.905c-1.621 7.82-6.258 14.437-13.056 18.63-4.609 2.843-9.767 4.297-15.016 4.297a29.01 29.01 0 0 1-7.494-.992Z"
    />
    <path
      fill="#ccc"
      d="M644.667 666.158 101.05 520.871c-11.614-3.104-19.707-12.448-21.121-24.387s4.272-22.915 14.84-28.646L315.69 348.022a28.866 28.866 0 0 1 18.378-3.093l365.157 60.197c7.795 1.285 14.55 5.581 19.022 12.095s6.05 14.361 4.447 22.097l-42.462 204.905c-1.621 7.82-6.258 14.437-13.056 18.63-4.609 2.843-9.767 4.297-15.016 4.297a29.01 29.01 0 0 1-7.494-.992Zm54.07-258.071-365.156-60.198a25.857 25.857 0 0 0-16.46 2.77L96.198 470.475c-9.464 5.132-14.558 14.963-13.291 25.656s8.515 19.061 18.917 21.842L645.442 663.26c6.91 1.845 14.071.796 20.16-2.96 6.09-3.755 10.242-9.682 11.694-16.687l42.461-204.904c1.436-6.928.021-13.957-3.983-19.791-4.004-5.834-10.055-9.68-17.037-10.831l.245-1.48-.245 1.48Z"
    />
    <path
      fill="#f2f2f2"
      d="m619.76 464.494-48.479 122.332c-4.7 11.86-17.895 17.929-29.958 13.778L184.988 478c-19.676-6.77-21.874-33.718-3.555-43.587l114.675-61.781a23.87 23.87 0 0 1 16.314-2.328l290.14 62.053c14.438 3.088 22.639 18.411 17.199 32.137Z"
    />
    <ellipse cx={526.414} cy={474.727} fill="#ff6884" rx={20.12} ry={10.06} />
    <ellipse cx={507.552} cy={505.535} fill="#3f3d56" rx={20.12} ry={10.06} />
    <ellipse cx={399.407} cy={464.038} fill="#6c63ff" rx={54.701} ry={27.351} />
    <path
      fill="#3f3d56"
      d="M304.466 462.781a1.888 1.888 0 0 0 .63-3.665l-39.916-14.147a1.887 1.887 0 0 0-1.26 3.556l39.916 14.147c.208.074.42.109.63.109ZM313.268 455.865a1.888 1.888 0 0 0 .63-3.665l-39.916-14.147a1.887 1.887 0 0 0-1.26 3.556l39.916 14.147c.208.074.42.109.63.109ZM322.07 448.949a1.888 1.888 0 0 0 .63-3.666l-39.915-14.146a1.887 1.887 0 0 0-1.26 3.556l39.916 14.147c.208.073.42.108.63.108ZM330.873 442.032a1.888 1.888 0 0 0 .63-3.665l-39.916-14.147a1.887 1.887 0 0 0-1.26 3.556l39.916 14.148c.208.073.42.108.63.108ZM339.676 435.116a1.888 1.888 0 0 0 .63-3.665l-39.916-14.147a1.887 1.887 0 0 0-1.26 3.556l39.916 14.147c.208.074.42.109.63.109ZM348.478 428.2a1.888 1.888 0 0 0 .63-3.665l-39.916-14.147a1.887 1.887 0 0 0-1.26 3.556l39.916 14.147c.208.074.42.109.63.109ZM357.28 421.284a1.888 1.888 0 0 0 .63-3.666l-39.915-14.146a1.887 1.887 0 0 0-1.26 3.556l39.916 14.147c.208.074.42.109.63.109Z"
    />
    <circle cx={222.728} cy={211.909} r={51.557} fill="#a0616a" />
    <path
      fill="#2f2e41"
      d="M233.417 135.202c-14.516-2.366-22.311-3.637-30.18-1.886-15.763 3.507-24.907 17.6-31.438 27.665-15.617 24.07-8.556 34.186-23.892 67.905-11.002 24.188-16.548 23.188-17.605 35.838-2.219 26.554 20.37 53.116 44.641 63.504 1.621.694 26.845 11.249 33.953 2.515 5.21-6.403-3.994-17.423-15.09-47.156-19.512-52.28-10.292-69.754-7.545-74.193 1.735-2.804 6.685-9.774 9.43-8.802 2.485.88.335 7.258 2.516 12.575 5.844 14.243 41.363 17.406 69.162 6.287 8.198-3.279 13.229-5.29 16.977-10.688 12.716-18.316-2.465-56.698-26.408-67.905-5.447-2.55-11.805-3.586-24.521-5.66Z"
    />
    <path
      fill="#a0616a"
      d="M196.554 442.382c12.54 6.36 19.422 17.985 15.373 25.965-4.05 7.98-17.495 9.29-30.038 2.926a35.187 35.187 0 0 1-12.772-10.632l-52.79-27.62 13.49-24.496 50.609 29.829a35.19 35.19 0 0 1 16.128 4.028ZM443.448 406.845c13.21 4.817 21.43 15.538 18.363 23.944-3.067 8.406-16.26 11.312-29.473 6.491a35.187 35.187 0 0 1-13.95-9.031l-55.71-21.12 10.468-25.931 53.808 23.573a35.19 35.19 0 0 1 16.494 2.074Z"
    />
    <path
      fill="#6c63ff"
      d="M136.59 269.754s-10.69-22.006-35.21-5.03c-24.522 16.977-82.996 87.396-82.996 87.396s-30.18 26.408-13.203 35.84 138.953 64.132 138.953 64.132l30.81-21.378L65.54 374.755l62.842-47.156 8.206-57.845ZM243.477 282.958s7.48-10.689 20.716 0 51.33 72.235 51.33 72.235l93.944 38.425-13.833 28.294-112.546-40.24-49.042-66.648 9.43-32.066Z"
    />
    <path
      fill="#2f2e41"
      d="M237.504 263.781c-14.26 7.281-7.698 18.46-8.174 20.749-4.634 22.29 12.306 45.377 18.862 44.012 3.847-.8 5.869-10.38 5.03-17.605-1.086-9.364 7.92-24.188 6.917-30.808-2.461-16.243 12.386-16.547 9.43-22.635-1.73-3.568-23.568 1.948-32.065 6.287Z"
    />
    <path
      fill="#fff"
      d="M402.787 492.835a1.5 1.5 0 0 0 1.492-1.677l-3.382-28.554a1.499 1.499 0 0 0-1.67-1.312l-53.708 6.459a1.5 1.5 0 0 0-1.31 1.668c.099.823.846 1.414 1.668 1.31l52.217-6.279 3.205 27.062a1.5 1.5 0 0 0 1.488 1.323Z"
    />
    <circle cx={126.217} cy={492.413} r={28} fill="#6c63ff" />
    <path
      fill="#fff"
      d="m113.495 488.046 9 15.827c.535.942 2.073 1.01 2.59 0 3.515-6.864 8.48-12.94 14.598-17.65.647-.497.976-1.284.539-2.052-.362-.635-1.412-1.03-2.053-.538-6.536 5.03-11.91 11.376-15.674 18.726h2.59l-9-15.827c-.954-1.678-3.546-.168-2.59 1.514Z"
    />
  </svg>
)
