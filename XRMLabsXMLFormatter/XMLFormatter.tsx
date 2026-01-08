import * as React from "react";

import { XMLParser, XMLValidator } from "fast-xml-parser";

// Table rendering helper
const renderObjectAsTable = (data: unknown): React.ReactNode => {
  const tableHeaderBg = "#ececec";

  const tdBg = "#fafbfc";

  const altTdBg = "#f4f6f8";

  const borderColor = "#d7d7d7";

  const thColor = "#303040";

  const tdColor = "#191922";

  const padY = "5px";

  const padX = "10px";

  const borderRadius = "6px";

  if (Array.isArray(data)) {
    const allKeys = new Set<string>();

    data.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item as Record<string, unknown>).forEach((k) =>
          allKeys.add(k)
        );
      }
    });

    return (
      <div
        style={{
          overflowX: "auto",

          overflowY: "auto",

          margin: "10px 0",
        }}
      >
        <table
          style={{
            tableLayout: "auto",

            borderCollapse: "separate",

            borderSpacing: 0,

            width: "100%",

            borderRadius,

            background: "#fff",
          }}
        >
          <thead>
            <tr>
              {Array.from(allKeys).map((key) => (
                <th
                  key={key}
                  style={{
                    border: `1px solid ${borderColor}`,

                    fontWeight: 600,

                    background: tableHeaderBg,

                    color: thColor,

                    padding: `${padY} ${padX}`,

                    fontSize: "1.00rem",

                    textAlign: "left",

                    letterSpacing: 0.1,

                    minWidth: 60,

                    wordBreak: "break-word",

                    whiteSpace: "normal",
                  }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIdx) => (
              <tr
                key={rowIdx}
                style={{ background: rowIdx % 2 === 0 ? altTdBg : tdBg }}
              >
                {Array.from(allKeys).map((key) => {
                  let cellValue: unknown = "";

                  if (typeof item === "object" && item !== null) {
                    const obj = item as Record<string, unknown>;

                    cellValue = obj[key];
                  }

                  return (
                    <td
                      key={key}
                      style={{
                        border: `1px solid ${borderColor}`,

                        padding: `${padY} ${padX}`,

                        verticalAlign: "top",

                        color: tdColor,

                        fontSize: "0.98rem",

                        minWidth: 48,

                        wordBreak: "break-word",

                        whiteSpace: "normal",
                      }}
                    >
                      {typeof cellValue === "object" && cellValue !== null
                        ? renderObjectAsTable(cellValue)
                        : String(cellValue)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <div
        style={{
          overflowX: "auto",

          overflowY: "auto",

          margin: "10px 0",
        }}
      >
        <table
          style={{
            tableLayout: "auto",

            borderCollapse: "separate",

            borderSpacing: 0,

            width: "100%",

            borderRadius,

            background: "#fff",
          }}
        >
          <tbody>
            {Object.entries(data as Record<string, unknown>).map(
              ([key, value], i) => (
                <tr key={key} style={{ background: i % 2 ? altTdBg : tdBg }}>
                  <td
                    style={{
                      border: `1px solid ${borderColor}`,

                      fontWeight: 600,

                      background: tableHeaderBg,

                      color: thColor,

                      padding: `${padY} ${padX}`,

                      minWidth: 64,

                      fontSize: "1.00rem",

                      wordBreak: "break-word",

                      whiteSpace: "normal",
                    }}
                  >
                    {key}
                  </td>
                  <td
                    style={{
                      border: `1px solid ${borderColor}`,

                      padding: `${padY} ${padX}`,

                      color: tdColor,

                      fontSize: "0.98rem",

                      minWidth: 48,

                      wordBreak: "break-word",

                      whiteSpace: "normal",
                    }}
                  >
                    {typeof value === "object" && value !== null
                      ? renderObjectAsTable(value)
                      : String(value)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return <span style={{ color: tdColor }}>{String(data)}</span>;
};

export interface IXMLFormatter {
  xml: string;
}

export const XMLFormatter: React.FC<IXMLFormatter> = ({ xml }) => {
  let parsed: unknown = null;

  let errorMsg: string | null = null;

  if (xml && typeof xml === "string") {
    const validation = XMLValidator.validate(xml, {
      allowBooleanAttributes: true,
    });

    if (
      validation !== true &&
      typeof validation === "object" &&
      (validation as { err?: unknown }).err
    ) {
      const err = (
        validation as {
          err: { line?: number; col?: number; msg?: string };
        }
      ).err;

      errorMsg =
        typeof err === "object" &&
        err !== null &&
        "line" in err &&
        "col" in err &&
        "msg" in err
          ? `Exception: Unable to parse XML input. Error on line ${err.line}, column ${err.col}: ${err.msg}`
          : "Exception: Unable to parse XML input. Unknown error.";
    } else {
      try {
        const parser = new XMLParser({ ignoreAttributes: false });

        parsed = parser.parse(xml);
      } catch (e) {
        errorMsg =
          "Exception: Unable to parse XML input. " +
          (e && typeof e === "object" && "message" in e
            ? (e as { message: string }).message
            : String(e));
      }
    }
  }

  return (
    <div
      style={{
        minHeight: "80px",

        background: "#f5f5f9",

        padding: "0.75rem 0.7rem 1.0rem 0.7rem",

        maxWidth: "100%",

        borderRadius: 8,

        boxSizing: "border-box",

        overflow: "auto",
      }}
    >
      {errorMsg && (
        <div
          style={{
            color: "tomato",

            fontWeight: 500,

            whiteSpace: "pre-line",
          }}
        >
          {errorMsg}
        </div>
      )}

      {!parsed && !errorMsg && (
        <div style={{ color: "#888" }}>No XML provided.</div>
      )}

      {parsed && renderObjectAsTable(parsed)}
    </div>
  );
};
