import cn.hutool.core.collection.LineIter;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.io.resource.ResourceUtil;
import cn.hutool.core.lang.Console;
import cn.hutool.core.util.StrUtil;
import java.util.ArrayList;
import java.util.List;


public class Test {
    public static void main(String[] args) {
        ArrayList<String> strings = new ArrayList<>();
        String csvName = "C:\\Users\\admin\\Desktop\\haianxian.csv";
        final LineIter lineIter = new LineIter(ResourceUtil.getUtf8Reader(csvName));
        for (String line : lineIter) {
            List<String> split = StrUtil.split(line, '|');
            for (int i = 0; i < split.size(); i++) {
                if (i % 2 == 1) {
                    strings.add(split.get(i));
                }
            }
        }
        FileWriter writer = new FileWriter("C:\\Users\\admin\\Desktop\\out.csv");
        for (String string : strings) {
            Console.log(string);
            writer.append(string+",\r\n");
        }
    }
}
