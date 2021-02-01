from django.http import QueryDict
import json
from rest_framework import parsers



class MultiPartJsonParsers(parsers.JSONParser):

    def parse(self, stream, media_type=None,parser_context=None):

        result = super().parse(
            stream,
            media_type=media_type,
            parser_context=parser_context
        )

        data = {}

        data  = json.loads(result.data["data"])
        qdict = QueryDict('', mutable=True)
        qdict.update(data)

        return parsers.DataAndFiles(qdict, result.files)