import { FormLayout, Page, Stack, Text, TextField } from "@shopify/polaris";
import { useState } from "react";

export default function Gugu() {
    const [num, setNum] = useState("2");
    const [percent, setPercent] = useState("40");
    const numTables = num ? parseInt(num) : 2;
    const tables = new Array(numTables)
        .fill(0)
        .map(() => <div style={{ paddingTop: "30px" }}>{table(percent)}</div>);
    console.log(
        new Array(numTables).map(() => 1),
        tables
    );

    return (
        <Page title={"9x9"} titleMetadata={<a href="/">worksheet.now.sh</a>}>
            <div className="no-print">
                <FormLayout>
                    <FormLayout.Group condensed>
                        <TextField
                            label="Tables"
                            type="number"
                            prefix="#"
                            value={num}
                            onChange={(val) => setNum(val)}
                            autoComplete="off"
                        />
                        <TextField
                            label="Blank"
                            type="number"
                            value={percent}
                            prefix="%"
                            step={10}
                            onChange={(val) => setPercent(val)}
                            autoComplete="off"
                        />
                    </FormLayout.Group>
                </FormLayout>
            </div>
            {tables}
        </Page>
    );
}

function table(percent) {
    const r = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const c = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let problems = [];
    return (
        <div>
            <table
                style={{
                    width: "100%",
                    margin: "auto",
                    fontSize: "20px",
                    borderCollapse: "collapse",
                    pageBreakInside: "avoid",
                    // border: "1px solid #000",
                }}
            >
                <tbody>
                    {r.map((i) => {
                        return (
                            <tr style={{ pageBreakInside: "avoid" }}>
                                {c.map((j) => {
                                    let v = j * i;
                                    const isHeader = j === 1 || i === 1;
                                    if (i === 1 && j === 1) v = "X";
                                    const p = Math.random();
                                    if (
                                        !isHeader &&
                                        p < parseInt(percent) / 100
                                    ) {
                                        v = "";
                                        problems.push(`${j} x ${i} =`);
                                    }

                                    return (
                                        <td
                                            style={{
                                                textAlign: "center",
                                                border: "1px solid #000",
                                                height: "50px",
                                                backgroundColor: isHeader
                                                    ? "#ddd"
                                                    : "white",
                                                fontWeight: isHeader
                                                    ? "bold"
                                                    : "",
                                            }}
                                        >
                                            {v}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div style={{ paddingTop: "30px" }}>
                <Stack spacing="loose">
                    {shuffleArray(problems)
                        .slice(0, 20)
                        .map((problem) => {
                            return (
                                <div style={{ width: "150px", height: "50px" }}>
                                    <Text variant="headingXl">{problem}</Text>
                                </div>
                            );
                        })}
                </Stack>
            </div>
        </div>
    );
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
