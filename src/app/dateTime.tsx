import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    IDateTimeFormatAppState,
  IAMPMSegmentType, IDaySegmentType, IEpochSegmentType, IFillSegmentType,
  IHourMinuteSecondSegmentType, IHourMinuteSegmentType, IHourSegmentType,
  IMinuteSegmentType, IMonthSegmentType, ISecondFractionSegmentType,
  ISecondSegmentType, ISegmentType, ITextMonthSegmentType,
  IYearSegmentType,
} from "../state";
import {Segment} from "./segment";

interface IStateProps {
    date: string;
}

interface IDispatchProps {
    dispatchSetDate(data: string): void;
}

type IConverterProps = IStateProps & IDispatchProps;

interface IComponentState {
    date: string;
}

export class UnconnectedDateTime extends React.Component<IConverterProps, IComponentState> {
  private static DATE_SEPARATORS: string[] = ["-", "/", "."];

  private segments: Segment[];

  constructor(datetimeString: string) {
    this.segments = this.parseSegments(datetimeString);
    // Set the first one to be selected for each
    for (let i = 0; i < this.segments.length; i++) {
      const enabledTypes: SegmentType[] = this.segments[i].getEnabledTypes();
      if (enabledTypes.length > 0) {
        this.segments[i].setSelectedID(enabledTypes[0].getID());
      }
    }
  }

//   public toString(): string {
//     let str = "";
//     for (let i = 0; i < this.segments.length; i++) {
//       str += this.segments[i].getToken();
//     }
//     return str;
//   }

//   public getSegments(): Segment[] {
//     return this.segments;
//   }

//   // TODO: is there a better way? Should I reuse the modals or create a new one every time... not sure
//   public editSegment(segment: Segment) {
//     const segmentId = this.segments.indexOf(segment);
//   "#edit-segment-modal input"put').val(segment.getToken());
//   "#edit-segment-modal .btn-primary"ary')."click"ick');
//   "#edit-segment-modal .btn-primary"ary').click(() => {
//       const va"#edit-segment-modal input"input').val();
//       const newSegment: Segment = new Segment(val);
//       newSegment.setSelected(segment.getSelectedType());
//       if (newSegment.getSelected() === null) {
//         newSegment.setSelected(FillSegmentType);
//       }
//       this.segments.splice(segmentId, 1, newSegment);
// "#edit-segment-modal"t-modal'"hide"l('hide');
//     })"#edit-segment-modal"t-modal').modal();
//   }

//   public deleteSegment(segment: Segment) {
//     const segmentId = this.segments.indexOf(segmen"#delete-segment-modal .btn-primary"n-prim"click"ff('click"#delete-segment-modal .btn-primary"n-primary').click(() => {
//       this.segments.splice(segmentId, 1)"#delete-segment-modal"ent-moda"hide"dal('hide');
//     "#delete-segment-modal"ent-modal').modal();
//   }

//   public newSegment(segment: Segment) {
//     const segmentId = this.segments.indexOf(segm"#new-segment-modal input"modal input').v"#new-segment-modal .btn-primary"btn-pr"click".off('cli"#new-segment-modal .btn-primary"btn-primary').click(() => {
//       "#new-segment-modal input"t-modal input').val();
//       const newSegment: Segment = new Segment(val);
//       newSegment.setSelected(FillSegmentType);
//       this.segments.splice(segmentId + 1, 0, newSe"#new-segment-modal"w-segmen"hide"l').modal('hide')"#new-segment-modal"w-segment-modal').modal();
//   }

//   public joinSegment(segment: Segment) {
//     const segmentId = this.segments.indexO"#join-segments-modal .segment1"s-modal .segment1').text('"' + this.segments[segmentId].getToke"#join-segments-modal .segment2"s-modal .segment2').text('"' + this.segments[segmentId + 1].getToke"#join-segments-modal .segment-out"odal .segment-out').text('"' + this.segments[segmentId].getToken() + this.segments[segmentId + 1].getToke"#join-segments-modal .btn-primary"odal ."click"mary').of"#join-segments-modal .btn-primary"odal .btn-primary').click(() => {
//       const token = this.segments[segmentId].getToken() + this.segments[segmentId + 1].getToken();
//       const newSegment: Segment = new Segment(token);
//       newSegment.setSelected(FillSegmentType);
//       this.segments.splice(segmentId, 2,"#join-segments-modal"'#join-s"hide"s-modal').modal('"#join-segments-modal"'#join-segments-modal').modal();
//   }

//   public splitSegment(segment: Segment) {
//     const segmentId = this.segments.indexOf(segment);
//     const token: string = this.segments[segmentId].getToken();
//     let newSegment: Segment;
//     const newSegments: Seg"#split-segment-modal .split-characters"gment-modal .sp""t-characters');
//     ul.html('');
//     for (let i = 0; i < token.l"<li>" i++) {
//       "</li>"nd('<li>' + token[i] + '</li>');
//       if (i !== token.length - 1) {
//         const id = "split-segment-checkbox_" + i;
//         ul.append('<input type="checkbox" id="' + id + '"><label for="' + id + '"><span class="glyphicon glyphicon-scissors">"#split-segment-modal .btn-primary"plit-s"click"modal .bt"#split-segment-modal .btn-primary"plit-segment-modal .btn-primary').click(() => {
//       const start = 0;
//       let end = 0;
//       const substringIndices: numb = "#split-segment-modal .split-characters inputsegment-modal .split-characters input");
//       for (let i = 0; i < checkboxes.length; i++) {
//         if ((<HTMLInputElement> checkboxes[i]).checked) {
//            substringIndices.push(i + 1);
//         }
//       }
//       for (le t i = 0; i < substringIndices.length; i++) {
//          end = substringIndices[i];
//         if (end > token.length) {
//           throw new Error("Tried to split on out of bounds");
//         }
//         newSegment = new Segment(token.substring(start, end));
//         newSegment.setSelected(FillSegmentType);
//         newSegments.push(newSegment);
//         start = substringIndices[i];
//       }
//       if (start < token.length) {
//         newSegment = new Segment(token.sub string(start, token.length));
//         newSegment.setSelected(FillSegmentType);
//         newSegments.push(newSegment);
//       }
//       this.segments.splice(segmentId, 1);
//       // XXX: FOR IN RETURNS A STRING???
//       fo r (let i = 0; i < newSegments.length; i++) {
//         this.segments.splice(seg mentId + i, 0, newSegments[i]);
//       }
//       $('#split-segment-modal').modal('hide');
//     });
//     $('#split-segment-modal').modal();
//   }

//   private parseSegments(datetimeString: string) {
//     // Tokens are hitespace, words, numbers, or other
//     let tokens: string[] = datetimeString.match(/([^a-zA-Z\s\d]+|\d+|\s+|[a-zA-Z]+)/g);
//     let segments = [];
//      for (let i = 0; i < tokens.length; i++) {
//       segme nts.push(new Segment(tokens[i]));
//     }
//     this.consolidateSegmentTypes(segments);
//     return segments;
//   }

//   private disableAllOfSegmentType(segments: Segment], segmentType: typeof SegmentType) {
//     let changed = false;
//      for (let i = 0;  i < segments.length; i++) {
//       if (seg ments[i].numTypes() > 1) {
//         if (segments[i].has(segmentType) && segments[i].hasEnabled(segmentType) ) {
//           changed = true;
//         }
//         segments[i].disableType(segmentType);
//       }
//     }
//     return changed;
//   }

//   private consolidateSegmentTypes (segments: Segment[]): void {
//      fr (let i = 0; i < segments.length; i++) {
//       let segment: Segment = segments[i];

//       // if we find an ampm, set all hour segments to non-24 hour period
//       if (segmen t.has(AMPMSegmentType)) {
//          for (let j = 0; j <  segments.length; j++) {
//           if (segments[j].has(HourSegmentType)) {
//             (segments[j].getType(HourSegmentType) as HourSegment Type).setTwentyFour(false);
//           }
//         }
//       }

//       // join date_ending with date to get a formatted date
//       if (i + 1 < segments.length && segment.has(DaySegmentType) && DaySegmentType.DATE_ENDINGS.indexOf(segments[i + 1].getToken().toLowerCase()) !== -1) {
//         segments.splice(i, 2, new Segment(segment.getToken() +  segments[i + 1].getToken()));
//         continue;
//       }

//       // assume Epoch is either everything or nothing
//       if (segment.has(EpochSegmentType) && segments.length > 1) {
//         segment .disableType(EpochSegmentType);
//       } else if (segment.has(EpochSegmentType)) {
//         seg ment.setType(EpochSegmentType);
//       }

//       // Parse +XX:XX:XX through -XXXX timezone segments
//       if (segment.getToken() === "-" || segment.getToken() == = "+") {
//         // +-XXXX
//         if (i + 1 < segments.length && segments[i + 1].has(HourMinuteSegmentType)) {
//           segments.splice(i, 2, new Segment(segment.getToken() + se gments[i + 1].getToken()));
//           continue;
//         }
//         // +-XX
//         if (i + 1 < segments.length && segments[i + 1].has(HourSegmentType) ) {
//           // +-XX:XX
//           if (i + 3 < segments.length && segments[i + 2].getToken() === ":" && segments[i + 3].has(MinuteSegmentType)) {
//              // +-XX:XX:XX
//             if (i + 5 < segments.length && segments[i + 4].getToken() === ":" && segments[i + 5].has(SecondSegmentType)) {
//               segments.splice(i, 6, new Segment(segment.getToken() + segments[i + 1].getToken() + ":" + segments[i + 3].getToken() + ":" + segmen ts[i + 5].getToken()));
//               continue;
//             } else {
//               segments.splice(i, 4, new Segment(segment.getToken() + segments[i + 1].getToken() + ":" + segmen ts[i + 3].getToken()));
//               continue;
//             }
//           } else {
//             segments.splice(i, 2, new Segment(segment.getToken() + segm ents[i + 1].getToken()));
//             continue;
//           }
//         }
//         // This has to be at the bottom because everything that matches against millisecond also matches against second
//         // +-XXXXXX
//         if (i + 1 < segments.length && segments[i + 1].has(HourMinuteSecondSegmentType)) {
//           segments.splice(i, 2, new Segment(segment.getToken() + se gments[i + 1].getToken()));
//           continue;
//         }
//       }

//       // Consolidate month/day/year and day/month/year fragments
//       if ((segment.has(MonthSegmentType) || segment.has(DaySegmentType)) && i + 2 < segments.length && DateTime.DATE_SEPARATORS.indexOf(segments[i + 1].getToken()) !== -1
//           && (segments[i + 2].has(DaySementType) || segments[i + 2].has(MonthSegmentType))) {
//         let j = i;
//         if (i + 4 < segments.length  && DateTime.DATE_SEPARATORS.indexOf(segments[i + 3].getToken()) !== -1 && segments[i + 4].has(YearSegmentType)) {
//           this.disableAllOfSegmentType( segments, YearSegmentType);
//           segments[i + 4].setTypes([YearSegmentType]);
//           j += 2;
//         }
//         this.disableAllOfSegmentType(segments, MonthSegmentType);
//         this.disableAllOfSegmentType(segments, DaySegmentType);
//         if (!segment.has(MonthSegmentType)) {
//           segme nt.setType(DaySegmentType);
//           segments[i + 2].setType(MonthSegmentType);
//         } else if (!segments[i + 2].has(MonthSegmentType)) {
//           segment .setType(MonthSegmentType);
//           segments[i + 2].setType(DaySegmentType);
//         } else {
//           segment.setTypes([MonthSeg mentType, DaySegmentType]);
//           segments[i + 2].setTypes([MonthSegmentType, DaySegmentType]);
//         }
//         i = j + 2;
//         continue;
//       }

//       // Consolidate year/month/day fragment
//       // nobody uses year/day/month practically
//       if (segment.has(YearSegmentType) && i + 4 < segments.length
//           && DateTime.DATE_SEPARATORS.indexOf(segments[i + 1].getToken()) !== -1 && segments[i + 2].has(MonthSegmentType)
//           && DateTime.DATE_SEPARATORS.indexOf(segments[i + 3].getToken()) !== -1 && segments[i + 4].has(DaySegmentType)) {
//         this.disableAllOfSegmentType (segments, MonthSegmentType);
//         this.disableAllOfSegmentType(segments, DaySegmentType);
//         this.disableAllOfSegmentType(segments, YearSegmentType);
//         segments[i + 2].setType(MonthSegmentType);
//         segments[i + 4].setType(DaySegmentType);
//         segment.setType(YearSegmentType);
//         i += 4;
//         continue;
//       }

//       // this has to come after month.day.year parsing or dates will be parsed as seconds.milliseconds
//       // Consolidate hour:minute(:second) fragments
//       if (segment.has(HourSegmentType) && i + 2 < segments.length && segments[i + 1].getoken() === ":" && segments[i + 2].has(MinuteSegmentType)) {
//         let j = i;
//         if (i + 4 < segments.length && segments[i + 3].getToken() === ":" && segments[i + 4].has(SecondSegmentType)) {
//           this.disableAllOfSegmentType(se gments, SecondSegmentType);
//           segments[i + 4].setType(SecondSegmentType);
//           // don't skip over second so we can process second.milliseconds
//           j += 1;
//         }
//         this.disableAllOfSegmentType(segments, HourMinuteSegmentType);
//         this.disableAllOfSegmentType(segments, HourSegmentType);
//         this.disableAllOfSegmentType(segments, MinuteSegmentType);
//         segment.setType(HourSegmentType);
//         segments[i + 2].setType(MinuteSegmentType);
//         i = j + 2;
//         continue;
//       }

//       // Second.milliseconds
//       if (segment.has(SecondSegmentType) && i + 2 < segments.length && segments[i + 1].getToken() === "." && segments[i + 2].has(SecondFractionSegmentType)) {
//         this.disableAllOfSegmentType( segments, SecondSegmentType);
//         this.disableAllOfSegmentType(segments, SecondFractionSegmentType);
//         segment.setType(SecondSegmentType);
//         segments[i + 2].setType(SecondFractionSegmentType);
//         i += 2;
//         continue;
//       }

//       // Because the previous section should skip over milliseconds if it finds them, ignore milliseconds here as they are probably erroneous
//       if (segment.has(SecondFractionSegmentType)) {
//         segment.disableT ype(SecondFractionSegmentType);
//       }
//     }

//      for (let i = 0; i < segments.length; i++) {
//       // Com bine two fill if consecutive
//       if (i + 1 < segments.length &&
//           segments[i].getOnlySegmentType() !== null && segments[i].getOnlySegmentType().getID() === FillSegmentType.id &&
//           segments[i + 1].getOnlySegmentType() !== null && segments[i + 1].getOnlySegmentType().getID() === FillSegmentType.id) {
//         segments.splice(i, 2, new Segment(segments[i].getToken() +  segments[i + 1].getToken()));
//         i -= 1;
//         continue;
//       }

//       // Remove fill if there are other types
//       if (segments[i].has(FillSegmentType) && segments[i].numTypes() > 1) {
//         segments[i ].disableType(FillSegmentType);
//       }
//     }

//     // if we find any one of the following alone, remove all equivalent types (including itself) from other segments if it won"t leave them empty
//     // repeat until no more changes
//     let segmentTypeEquivalences: (typeof SegmentType)[][] = [
//       [TextMonthSegmentType, MonthSegmentType],
//       [HourSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType],
//       [MinuteSegmentType, HourMinuteSegmentType, HourMinuteSecondSegmentType],
//       [SecondSegmentType, HourMinuteSecondSegmentType],
//     ];

//     // add singleton equivalence classes everywhere
//     for  (let i = 0; i < SEGMENT_TYPES.length; i++) {
//       segmentTypeEquivale nces.unshift([SEGMENT_TYPES[i]]);
//     }

//     let changed = true;
//     while (changed) {
//      changed = false;
//        for (let i = 0; i < segments.length; i++) {
//         let onlySegmentType: SegmentType = segments[i].getOnlySegmentType();
//         if (only SegmentType !== null) {
//           for (let j = 0 ; j < segmentTypeEquiva lences.length; j++) {
//             for (let k = 0; k < segmentTypeEquivalenc es[j].length; k++) {
//               if (onlySegmentType instanceof segmentTypeEqui valences[j][k]) {
//                 for (let l = 0; l < segmentTypeEquivalences[j].length; l++) {
//                   changed = changed || this.disableAllOfSegmentType(segments, segmentTyp eEquivalences[j][l]);
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }

  public render() {
      return
    //         <div class="datetime" *ngIf="datetime">
    //     <span *ngFor="#segment of datetime.segments; #last=last" class="segment-container">
    //       <div class="segment-container-body">
    //         <segment [segment]="segment" [datetime]="datetime">;Segment</segment>
    //       </div>
    //       <div class="segment-buttons">
    //         <div class="insert-segment">
    //           <span class="glyphicon glyphicon-plus" (click)="datetime.newSegment(segment)" title="Insert Segment"> </span>
    //         </div>
    //         <div class="merge-segment">
    //           <span class="glyphicon glyphicon-resize-small" (click)="datetime.joinSegment(segment)" title="Merge Segments"> </span>
    //         </div>
    //       </div>
   ; //     </span>
    //   </div>
  }
}

function mapStateToProps(state: IDateTimeFormatAppState, _props: {}): IStateProps {
    const { date } = state;

    return {
        date,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IDateTimeFormatAppState>, _props: {}): IDispatchProps {
    return {
        dispatchSetDate: (date: string) => dispatch(setDate(date)),
    };
}

export const Converter = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDateTime);
