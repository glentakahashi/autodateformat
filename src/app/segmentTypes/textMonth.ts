export class TextMonthSegmentType extends StringSegmentType {
    public static id = "TextMonth";
    public static label = "Text Month";

    private static SHORT_MONTHS: string[] = [
        "jan", "feb", "mar", "apr", "may", "jun",
        "jul", "aug", "sep", "sept", "oct", "nov", "dec",
    ];
    private static MONTHS: string[] = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december",
    ];

    constructor(token: string) {
        super(token);
        this.settings.add(new BooleanSegmentTypeSetting("abbreviated", "Abbreviated", "Abbreviate the name (i.e. Mon,Tues,Wed)", true));
        if (TextMonthSegmentType.SHORT_MONTHS.indexOf(token.toLowerCase()) !== -1) {
            this.setCaseStyle(token);
            this.settings.setValue("abbreviated", true);
            this.valid = true;
        } else if (TextMonthSegmentType.MONTHS.indexOf(token.toLowerCase()) !== -1) {
            this.setCaseStyle(token);
            this.settings.setValue("abbreviated", false);
            this.valid = true;
        }
    }

    public isAbbreviated(): boolean {
        return this.settings.get("abbreviated").getValue();
    }
}